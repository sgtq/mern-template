import Pin from "../Model/Pin.js";

// GET /api/pins/
export const getAllPins = async (req, res, next) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    } catch (error) {
        res.status(500).json(error);
        throw new Error(error.message);
    }
};

// POST /api/pins
export const createPin = async (req, res, next) => {
    const { username, title, rating, lat, lon } = req.body;

    if (!username || !title || !rating || !lat || !lon) {
        console.log("Needed params not sent");
        return res.sendStatus(400);
    }

    try {
        const pin = await Pin.create(req.body);

        res.status(200).json(pin);
    } catch (error) {
        res.status(500).json(error);
        throw new Error(error.message);
    }
};
