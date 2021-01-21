#!/bin/bash

echo
trap echo EXIT

NC='\033[0m'
BRIGHT_BLACK='\033[0;1;30m'
BRIGHT_BLUE='\033[0;1;34m'
BRIGHT_CYAN='\033[0;1;36m'
BRIGHT_GRAY='\033[0;0;37m'
BRIGHT_GREEN='\033[0;1;32m'
BRIGHT_MAGENTA='\033[0;1;35m'
BRIGHT_RED='\033[0;1;31m'
BRIGHT_YELLOW='\033[0;1;33m'
BLACK='\033[0;0;30m'
BLUE='\033[0;0;34m'
CYAN='\033[0;0;36m'
GREEN='\033[0;0;32m'
MAGENTA='\033[0;0;35m'
RED='\033[0;0;31m'
WHITE='\033[0;1;37m'
YELLOW='\033[0;0;33m'

SUCCESS_SYMBOL="${GREEN}✓${NC}"
FAILURE_SYMBOL="${RED}${NC}"

while :; do
  case $1 in
  --all)
    command_line_list+=("lint::all")
    ;;
  --code)
    command_line_list+=("lint::code")
    ;;
  --spell)
    command_line_list+=("lint::spell")
    ;;
  --type-check)
    command_line_list+=("lint::type_check")
    ;;
  --fix)
    fix="set"
    ;;
  ?*)
    target_list+=("$1")
    ;;
  *)
    break
    ;;
  esac
  shift
done

function exit_if_empty() {
  if [[ -z "$1" ]]; then
    exit 0
  fi
}

function run() {
  eval "npx -q $1"
}

function indent() {
  sed 's/^/  /'
}

function filter_files_in_target_list() {
  local pattern="$1"
  local filtered_target_list=()

  for target in ${target_list[@]}; do
    if [[ ! -f "$target" ]] || $(echo "$target" | grep -Eq "$pattern"); then
      filtered_target_list+=("$target")
    fi
  done

  echo $filtered_target_list
}

function pad_end() {
  local string="$1"
  local max_length="$2"
  local length_to_add="$((${#string} - $max_length))"
  printf -v pad %${length_to_add}s
  string="$string$pad"
  echo "$string"
}

function build_headline() {
  local description="$1"
  local pid="$2"
  local spinner="⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏"
  local spinner_step=0
  progress_headline_max_length=25
  progress_indicator_count=0

  echo -en "$description "

  while kill -0 $pid 2>/dev/null; do
    if [[ $progress_indicator_count -lt $progress_headline_max_length ]]; then
      progress_indicator_count="$(($progress_indicator_count + 1))"
      echo -n ". "
      sleep 0.05
    else
      echo -en "${spinner:$spinner_step:1}\010"
      spinner_step="$((($spinner_step + 1) % 10))"
      sleep 0.05
    fi
  done
}

function print_remaining_lines() {
  while [[ $progress_indicator_count -lt $progress_headline_max_length ]]; do
    progress_indicator_count="$(($progress_indicator_count + 1))"
    echo -n ". "
    sleep 0.05
  done
}

function show_progress() {
  local text="$1"
  local command_line="$2"
  local color="$3"
  local project="$(basename $PWD)"

  local description="$(pad_end "$text" 25) ($project)"

  run "$command_line" >/tmp/_out &
  local output_pid="$!"

  build_headline "$color$description" "$output_pid"

  wait $output_pid
  local exit_code="$?"
  local output="$(</tmp/_out)"
  print_remaining_lines

  if [[ "$exit_code" -eq 0 ]]; then
    echo -e "${SUCCESS_SYMBOL}"
  else
    echo -e "${FAILURE_SYMBOL}"
    echo "$output" | indent
    exit 1
  fi
}

function lint::all() {
  local exit=0
  trap 'exit="$?"' ERR
  lint::type_check
  lint::code
  lint::spell
  exit $exit
}

function lint::code() {
  (
    local filtered_target_list="$(filter_files_in_target_list '\.(js|ts)$')"
    exit_if_empty "$filtered_target_list"

    command_line="eslint $filtered_target_list --max-warnings=0 --ignore-path .gitignore --color"
    if [[ $fix ]]; then command_line="$command_line --fix"; fi

    show_progress " Running ESLint" "$command_line" ${BLUE}
  )
}

function lint::spell() {
  (
    local filtered_target_list
    if [[ $target_list == '.' ]]; then
      filtered_target_list="'**/*'"
    else
      filtered_target_list="$(filter_files_in_target_list '\.(js|ts)$')"
    fi
    exit_if_empty "$filtered_target_list"

    command_line="cspell $filtered_target_list --color --no-progress --no-summary"

    show_progress " Checking spell" "$command_line" ${BRIGHT_GREEN}
  )
}

function lint::type_check() {
  (
    local filtered_target_list="$(filter_files_in_target_list '\.(js|ts)$')"
    exit_if_empty "$filtered_target_list"

    command_line="tsc -b --pretty"

    show_progress "ﯤ Checking types" "$command_line" ${BRIGHT_BLUE}
  )
}

if [[ -z "$target_list" ]]; then
  target_list="."
fi

if [[ -z "$command_line_list" ]]; then
  command_line_list=("lint::all")
fi

if [[ " ${command_line_list[@]} " =~ " lint::all " ]]; then
  lint::all
else
  exit=0
  trap 'exit="$?"' ERR

  for command_line in "${command_line_list[@]}"; do
    "$command_line"
  done

  exit $exit
fi
