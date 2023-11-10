const prisma = require('../prisma');   



const seed = async (numGenres = 10, moviesPerGenre = 40) => {

    for (let i = 0; i <numGenres; i++) {
        const movies= [];
        for (let j = 0; j < moviesPerGenre; j++) {
            movies.push ({ 
                title: `Movie ${i}-${j}`,
                director: `Director ${i}-${j}`,
                year: `Year ${i}-${j}`,
                rating: `Rating ${i}-${j}`,
                userId: `User ${i}-${j}`,
            });
        }

        await prisma.genre.create({
            data: {
                name: `Genre ${i}`,
                movies: {
                    create: movies,
                },
            },
        });
    }
};

seed()
.then(async () => await prisma.$disconnect())
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});