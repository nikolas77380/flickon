import * as dotenv from "dotenv";
import { CodegenConfig } from "@graphql-codegen/cli";

dotenv.config();

const config: CodegenConfig = {
  schema: `${process.env.API_BASE_URL}/graphql`,
  documents: ["app/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./lib/gql/": {
      preset: "client",
    },
  },
};

export default config;
