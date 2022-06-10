class SpacesController {
    async index(req, res) {
        const spaces = await Space.findAll();
        return res.json(spaces);
    }

    async store(req, res) {
        const { title, description, price, thumbnail } = req.body;

        const space = await Space.create({
            title,
            description,
            price,
            thumbnail
        });

        return res.json(space);
    }
}