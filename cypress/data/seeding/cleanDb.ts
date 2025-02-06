

const cleanDb = async () => {
    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/seed?action=clean`,
            {
                method: 'POST',
                headers: {
                    'x-api-key': process.env.SEED_API_KEY
                }
            }
        );
        const body = await response.json();
        //console.log(body);
    } catch (error) {
        console.error(error);
    }
};

export default cleanDb;
