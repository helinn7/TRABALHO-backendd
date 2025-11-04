import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error.name === 'UnauthorizedError') {
        return res.status(401).json({
            message: 'Você precisa estar logado para acessar este recurso'
        });
    }

    if (error.name === 'NotFoundError') {
        return res.status(404).json({
            message: 'O recurso solicitado não foi encontrado'
        });
    }

    console.error(error);
    return res.status(500).json({
        message: 'Erro interno do servidor'
    });
};

export default errorHandler;