import { or } from "ramda";

const PROJECT_ID = or(process.env.NEXT_PUBLIC_PROJECT_ID, "");

export { PROJECT_ID };
