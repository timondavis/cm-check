FROM captainhowdy/cm-library-main:0.2

RUN mkdir -p /usr/local/lib/cm
COPY ./ /usr/local/lib/cm/cm-check/
WORKDIR /usr/local/lib/cm/cm-check
CMD /bin/sh -c "npm install ; exec tsc -w"