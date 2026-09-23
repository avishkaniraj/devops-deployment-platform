FROM maven:3.9.11-eclipse-temurin-21-alpine AS build

WORKDIR /workspace

COPY pom.xml ./
RUN mvn -B dependency:go-offline

COPY src ./src
RUN mvn -B -DskipTests package \
    && jar_file="$(find target -maxdepth 1 -type f -name '*.jar' ! -name '*.original' -print -quit)" \
    && test -n "$jar_file" \
    && cp "$jar_file" app.jar

FROM eclipse-temurin:21-jre-alpine AS runtime

RUN addgroup -S spring && adduser -S spring -G spring

WORKDIR /app

COPY --from=build --chown=spring:spring /workspace/app.jar ./app.jar

USER spring:spring

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
