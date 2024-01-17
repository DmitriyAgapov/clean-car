FROM ubuntu:latest
LABEL authors="Agapov"

ENTRYPOINT ["top", "-b"]
