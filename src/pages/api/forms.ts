import {NextApiRequest, NextApiResponse} from "next";
import Form from "@database/schemas/form-schema";
import {ObjectId} from "mongoose";
import connectToDatabase from "@database/db";

const handleGet = async (res: NextApiResponse) => {
    const formsWithoutContent: {_id: ObjectId, formName: string}[] = await Form.find({}, '_id formName')
    res.send(formsWithoutContent)
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    await connectToDatabase()
    if (req.method === 'GET') {
        await handleGet(res)
    }
}

export default handler;
