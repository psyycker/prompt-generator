import {NextApiRequest, NextApiResponse} from "next";
import Form from "@database/schemas/form-schema";
import connectToDatabase from "@database/db";

const handleGet = async (id: string, res: NextApiResponse) => {
    const form = await Form.findById(id);
    res.send(form)
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    await connectToDatabase();
    if (req.method === 'GET') {
        const {id} = req.query
        await handleGet(id as string, res);
    }
}

export default handler;
