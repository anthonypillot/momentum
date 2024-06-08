import MomentumServer from "@/server";
import { logger } from "@/utils/logger";

logger.info("Starting Momentum server");

const server = new MomentumServer();
server.start();
