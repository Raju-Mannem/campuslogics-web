import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
       "prisma/**",
       "src/lib/graphql/**",
       "src/lib/apollo-client.ts",
       "src/lib/apollo-server.ts",
       "src/components/extensions/**",
       "src/generated/**",
       "graphql/**",
       "react/no-unescaped-entities",
       "@next/next/no-page-custom-font"
    ],
  },
];

export default eslintConfig;
