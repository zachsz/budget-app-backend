interface ServerConfig {
    db: string;
    port: number;
}

const env = process.env.NODE_ENV || 'development';

export default require(`./${env}`).default as ServerConfig;
