FROM public.ecr.aws/lambda/nodejs:22 AS builder

# Add AWS Lambda Web Adapter extension
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.1 /lambda-adapter /opt/extensions/lambda-adapter

WORKDIR /var/task

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./
RUN npx prisma generate && npm run build

FROM public.ecr.aws/lambda/nodejs:22 AS runner

WORKDIR /var/task

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /var/task/dist ./dist
COPY --from=builder /var/task/node_modules/.prisma ./node_modules/.prisma

COPY --from=builder /opt/extensions/lambda-adapter /opt/extensions/lambda-adapter

ENV AWS_LAMBDA_EXEC_WRAPPER=/opt/extensions/lambda-adapter
ENV AWS_LWA_ENABLE_COMPRESSION=true
ENV AWS_LWA_INVOKE_MODE=BUFFERED

CMD ["node", "dist/server.js"]
