FROM captainhowdy/cm-library-main:0.2

RUN mkdir -p /usr/local/lib/cm
RUN mkdir -p /usr/local/lib/cm/cm-check
WORKDIR /usr/local/lib/cm/cm-check
CMD /bin/sh -c "[ ! -d 'node_modules' ] && npm install; exec tsc -w"
