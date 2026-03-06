FROM eclipse-temurin:21-jdk

WORKDIR /app

# Build from source 
COPY . .
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests
RUN mv target/*.jar app.jar

# Use Render's PORT 
EXPOSE ${PORT:-10000}

# Pass ALL Render ENV vars to Spring Boot
ENTRYPOINT ["sh", "-c", "java -jar /app/app.jar"]

