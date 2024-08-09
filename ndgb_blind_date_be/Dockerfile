# 베이스 이미지로 Go를 사용합니다.
FROM golang:1.22.5 as builder

# 작업 디렉터리를 설정합니다.
WORKDIR /app

# go.mod와 go.sum 파일을 복사합니다.
COPY go.mod ./
COPY go.sum ./

# 의존성을 다운로드합니다. 이렇게 하면 소스 코드 변경 없이도 Docker 캐시를 활용할 수 있습니다.
RUN go mod download

# # 소스 코드를 복사합니다.
# COPY . .

# # 애플리케이션을 빌드합니다.
# RUN go build -o /app/ndgb_blind_date

# # 최종 런타임 이미지로 최신 Ubuntu를 사용합니다.
# FROM ubuntu:22.04

# # 필요한 시스템 패키지를 설치합니다.
# RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# # 애플리케이션을 디렉터리에 복사합니다.
# COPY --from=builder /app/ndgb_blind_date /usr/local/bin/ndgb_blind_date

# 애플리케이션을 실행합니다.
# CMD ["ndgb_blind_date"]

CMD ["go", "run", "/app/main.go"]