FROM captainhowdy/cm-library-main

RUN mkdir -p /usr/local/lib/cm
COPY ./ /usr/local/lib/cm/cm-check/
WORKDIR /usr/local/lib/cm/cm-check
CMD /bin/sh -c "yarn install ; exec tsc -w"