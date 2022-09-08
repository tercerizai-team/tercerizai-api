import { Request, Response } from "express";
import { listProvidersService } from "../../services/providers/listProviders.service";

export const listProvidersController = async (req: Request, res: Response) => {

    const providers = await listProvidersService()
    return res.json(providers)
}