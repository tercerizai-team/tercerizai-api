import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { updateProviderService } from "../../services/providers/updateProvider.services";

export const updateProviderController = async (req: Request, res: Response) => {
  const providerData = req.body;
  const id = req.params.id;
  const isAdm = req.userIsAdm;
  const providerId = req.userId;

  const newProvider = await updateProviderService(
    providerData,
    id,
    isAdm,
    providerId
  );
  return res.json(instanceToPlain(newProvider));
};
