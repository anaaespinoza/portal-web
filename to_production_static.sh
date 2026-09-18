#!/usr/bin/env bash

set -euo pipefail

# Directorio raiz del repositorio
SCRIPT_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPOSITORY_ROOT="${SCRIPT_DIRECTORY}"

# ============================================================
# CONFIGURACION DE TU PROYECTO  (editar aqui)
# ============================================================

# Comando del build de tu herramienta.
# Ejemplos: "npm run build" | "npm ci && npm run build" | "ng build" | "vite build"
BUILD_COMMAND="npm run build"

# Nombre de la carpeta que produce tu build (dist, build, out, .output/public, ...)
DIST_DIRECTORY_NAME="dist"
DIST_DIRECTORY="${REPOSITORY_ROOT}/${DIST_DIRECTORY_NAME}"

# ============================================================
# Versionado (mismo formato que to-production.sh)
# ============================================================

METADATA_DIRECTORY="${REPOSITORY_ROOT}/docs/versions"
VERSION_FILE="${METADATA_DIRECTORY}/version-history.txt"

# ============================================================
# Servidores  "alias|usuario@host|/ruta/web/servida"
# El web server debe apuntar SIEMPRE a ${REMOTE_WEB_ROOT}/latest.
# El script archiva 'latest' como su version registrada y sube
# el build nuevo como 'latest'.
# ============================================================

SERVER_PROFILES=(
  "tecmm|root@tecmm.mx|/srv/static-sites/tsj-front"
)

# Uso

usage() {
  cat << 'EOF'
Usage:
  ./to_production_static.sh -S servidor -M "Descripcion del release"
  ./to_production_static.sh -S servidor -U "Descripcion del release"
  ./to_production_static.sh -S servidor -F "Descripcion del release"
  ./to_production_static.sh --list-servers

Flags:
  -S  Alias del servidor de destino.
  -M  Incrementa la version mayor: X.0.0
  -U  Incrementa la version menor: x.Y.0
  -F  Incrementa la version fix:  x.y.Z
  --dry-run     Solo muestra lo que se haaria (no construye ni sube).
  --skip-build  No ejecuta BUILD_COMMAND (sube el dist ya existente).

Funcionamiento:
  Ejecuta el build de tu herramienta, archiva la carpeta remota 'latest'
  como la version registrada actual y sube el build nuevo como 'latest'.
  El proxy / web server apunta siempre a <ruta remota>/latest.

Para agregar un servidor, anade una entrada a SERVER_PROFILES:
  "alias|usuario@host|/ruta/web/servida-del-sitio"
EOF
}

# Listar servidores

list_servers() {
  local server_profile
  local server_alias
  local remote_host
  local remote_web_root

  echo "Servidores disponibles:"
  for server_profile in "${SERVER_PROFILES[@]}"; do
    IFS='|' read -r server_alias remote_host remote_web_root <<< "${server_profile}"
    printf "  %s  %s | web: %s\n" "${server_alias}" "${remote_host}" "${remote_web_root}"
  done
}

# Resolver el servidor

resolve_server_profile() {
  local requested_alias="$1"
  local server_profile
  local server_alias

  for server_profile in "${SERVER_PROFILES[@]}"; do
    IFS='|' read -r server_alias REMOTE_HOST REMOTE_WEB_ROOT <<< "${server_profile}"
    if [ "${server_alias}" = "${requested_alias}" ]; then
      return 0
    fi
  done

  echo "Alias de servidor no valido: ${requested_alias}" >&2
  list_servers >&2
  return 1
}

# Variables iniciales

SERVER_ALIAS=""
RELEASE_KIND=""
DESCRIPTION=""
DRY_RUN="${DRY_RUN:-0}"
SKIP_BUILD="${SKIP_BUILD:-0}"

if [ "${1:-}" = "--list-servers" ]; then
  list_servers
  exit 0
fi

if [ "${1:-}" = "--dry-run" ]; then
  DRY_RUN=1
  shift
fi

if [ "${1:-}" = "--skip-build" ]; then
  SKIP_BUILD=1
  shift
fi

while getopts ":S:M:U:F:h" option; do
  case "${option}" in
    S)
      SERVER_ALIAS="${OPTARG}"
      ;;
    M | U | F)
      if [ -n "${RELEASE_KIND}" ]; then
        echo "Solo puedes indicar una bandera de version." >&2
        exit 1
      fi
      RELEASE_KIND="-${option}"
      DESCRIPTION="${OPTARG}"
      ;;
    h)
      usage
      exit 0
      ;;
    :)
      echo "La bandera -${OPTARG} requiere un valor." >&2
      usage
      exit 1
      ;;
    *)
      usage
      exit 1
      ;;
  esac
done

if [ -z "${SERVER_ALIAS}" ] || [ -z "${RELEASE_KIND}" ] || [ -z "${DESCRIPTION}" ]; then
  usage
  exit 1
fi

if ! resolve_server_profile "${SERVER_ALIAS}"; then
  exit 1
fi

if [ ! -f "${VERSION_FILE}" ]; then
  echo "No se encontro el historial de versiones en: ${VERSION_FILE}" >&2
  echo "Crealo con una linea de semilla, por ejemplo:" >&2
  echo "  $(date +%F) | 0.0.1 | - | Release inicial | -" >&2
  exit 1
fi

LAST_VERSION="$(tail -n 1 "${VERSION_FILE}" | awk -F'|' '{gsub(/ /, "", $2); print $2}')"
if [[ ! "${LAST_VERSION}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "La ultima version en ${VERSION_FILE} no tiene el formato esperado." >&2
  exit 1
fi

IFS='.' read -r MAJOR_VERSION MINOR_VERSION FIX_VERSION <<< "${LAST_VERSION}"
case "${RELEASE_KIND}" in
  -M)
    MAJOR_VERSION=$((MAJOR_VERSION + 1))
    MINOR_VERSION=0
    FIX_VERSION=0
    VERSION_LABEL="M"
    ;;
  -U)
    MINOR_VERSION=$((MINOR_VERSION + 1))
    FIX_VERSION=0
    VERSION_LABEL="U"
    ;;
  -F)
    FIX_VERSION=$((FIX_VERSION + 1))
    VERSION_LABEL="F"
    ;;
esac

NEXT_VERSION="${MAJOR_VERSION}.${MINOR_VERSION}.${FIX_VERSION}"
DATE_STAMP="$(date +"%Y-%m-%d")"

echo "Servidor: ${SERVER_ALIAS} (${REMOTE_HOST})"
echo "Ruta web: ${REMOTE_WEB_ROOT}/latest"
echo "Nueva version que publica 'latest': ${NEXT_VERSION}"
echo "Version actual que se archiva: ${LAST_VERSION}"
echo "Descripcion: ${DESCRIPTION}"

if [ "${DRY_RUN}" = "1" ]; then
  echo "Dry run: no se ejecutara el build ni se subira nada."
  exit 0
fi

if [ "${SKIP_BUILD}" != "1" ]; then
  echo "Ejecutando build: ${BUILD_COMMAND}"
  ( cd "${REPOSITORY_ROOT}" && eval "${BUILD_COMMAND}" )
else
  echo "Omitiendo el build (--skip-build)"
fi

if [ ! -d "${DIST_DIRECTORY}" ] || [ -z "$(command ls -A "${DIST_DIRECTORY}" 2>/dev/null || true)" ]; then
  echo "No se encontro contenido en la carpeta de build: ${DIST_DIRECTORY}" >&2
  exit 1
fi

echo "Verificando que no existan carpetas 'latest' duplicadas en el servidor"
LATEST_COUNT="$(ssh "${REMOTE_HOST}" "find '${REMOTE_WEB_ROOT}' -maxdepth 1 -type d -name latest 2>/dev/null | wc -l | tr -d ' '")"
if [ "${LATEST_COUNT}" -gt 1 ]; then
  echo "ERROR: hay ${LATEST_COUNT} carpetas 'latest' bajo '${REMOTE_WEB_ROOT}'. Resuelvelo manualmente antes de publicar." >&2
  exit 1
fi

echo "Creando ruta remota"
ssh "${REMOTE_HOST}" "mkdir -p '${REMOTE_WEB_ROOT:?}'"

if [ "${LATEST_COUNT}" -eq 1 ]; then
  echo "Archivando 'latest' actual como version ${LAST_VERSION}"
  ssh "${REMOTE_HOST}" "mv '${REMOTE_WEB_ROOT}/latest' '${REMOTE_WEB_ROOT}/${LAST_VERSION}'"
fi

echo "Subiendo build como 'latest'"
ssh "${REMOTE_HOST}" "mkdir -p '${REMOTE_WEB_ROOT}/latest'"
scp -r "${DIST_DIRECTORY}/." "${REMOTE_HOST}:${REMOTE_WEB_ROOT}/latest/"

printf "%s | %s | %s | %s | %s\n" \
  "${DATE_STAMP}" "${NEXT_VERSION}" "${VERSION_LABEL}" "${DESCRIPTION}" "${DIST_DIRECTORY_NAME}/" >> "${VERSION_FILE}"

echo
echo "Sitio publicado: ${REMOTE_HOST}:${REMOTE_WEB_ROOT}/latest"
echo "Version archivada: ${LAST_VERSION}"
echo "Release registrado en: ${VERSION_FILE}"