"use server";

import { db } from "@/db";
import {
  CaseFinish,
  CaseColor,
  CaseMaterial,
  PhoneModel,
  Prisma,
} from "@/generated/prisma";

export type saveConfigArgs = {
  color: CaseColor;
  finish: CaseFinish;
  material: CaseMaterial;
  model: PhoneModel;
  configId: string;
};

// export async function saveConfig({
//   color,
//   finish,
//   material,
//   model,
//   configId,
// }: saveConfigArgs) {
//     console.log("we ..........................")
//   await db.configuration.update({
//     where: { id: configId },
//     data: { color, finish, material, model },
//   });
//   console.log("we ..........................")
// }

export async function saveConfig({
  color,
  finish,
  material,
  model,
  configId,
}: saveConfigArgs) {
      if (!configId) {
    throw new Error("configId is required to update a configuration");
  }
  try {
    console.log("Starting update for config ID:", configId);
    // Debug: Log the input values
console.log("Received configId:", configId);
console.log("Other values:", { color, finish, material, model });
    
    const updatedConfig = await db.configuration.update({
      where: { id: configId },
      data: { 
        color, 
        finish, 
        material, 
        model 
      },
    });

    console.log("Successfully updated config:", updatedConfig);
    return updatedConfig;
    
  } catch (error) {
    console.error("Error updating configuration:", error);
    
    // Handle specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new Error(`Configuration with ID ${configId} not found`);
      }
    }
    
    throw error; // Re-throw for the caller to handle
  }
}