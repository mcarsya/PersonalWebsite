import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { matchBrief } from "./matcher.server";

export const matchProject = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ brief: z.string().trim().min(15).max(2000) }).parse(d))
  .handler(async ({ data }) => matchBrief(data.brief));
