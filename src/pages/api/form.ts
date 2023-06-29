import type { ObjectId } from "mongoose";
import {NextApiRequest, NextApiResponse} from "next";
import connectToDatabase from "@database/db";
import Form from "@database/schemas/form-schema";

const handlePost = async (data: {formName: string}, res: NextApiResponse) => {
    if (await Form.exists({
        formName: data.formName
    })) {
        res.status(400)
        res.send("Form already exists")
        return;
    }
    const newForm = new Form({
        formName: data.formName,
        formContent: {}
    })
    try {
        const result: {_id: ObjectId, formName: string} = await newForm.save()
        res.status(200)
        res.send({
            id: result._id.toString(),
            formName: result.formName
        });
    } catch (e) {
        res.status(500)
        console.error("Error while creating the form", e)
        res.send("Error while creating the form")
    }
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    await connectToDatabase();
    if (req.method === 'POST') {
        await handlePost(req.body, res)
    }
}

export default handler;
