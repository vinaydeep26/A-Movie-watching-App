// import serverAuth from '@/lib/serverAuth';
// import { without } from 'lodash';
// import { NextApiRequest, NextApiResponse } from 'next';
// import prismadb from "@/lib/prismadb";

// export default async function handler(req:NextApiRequest, res:NextApiResponse) {

//   if (req.method == 'DELETE') {
//     console.log("teste")
//     console.log(req)
//     const { currentUser } = await serverAuth(req, res);

//     const { movieId } = req.query;

//     if (typeof movieId !== 'string') {
//       throw new Error('Invalid Id');
//     }

//     if (!movieId) {
//       throw new Error('Missing Id');
//     }

//     const existingMovie = await prismadb.movie.findUnique({
//       where: {
//         id: movieId,
//       }
//     });

//     if (!existingMovie) {
//       throw new Error('Invalid ID');
//     }

//     const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

//     const updatedUser = await prismadb.user.update({
//       where: {
//         email: currentUser.email || '',
//       },
//       data: {
//         favoriteIds: updatedFavoriteIds,
//       }
//     });

//     return res.status(200).json(updatedUser);
//   }

//   return res.status(405).end();

// }

import serverAuth from '@/lib/serverAuth';
import { without } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "@/lib/prismadb";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  const { currentUser } = await serverAuth(req, res);

  if (req.method === 'GET') {
    const { movieId } = req.query;

    if (typeof movieId !== 'string') {
      return res.status(400).json({ error: 'Invalid Id' });
    }

    if (!movieId) {
      return res.status(400).json({ error: 'Missing Id' });
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      }
    });

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    return res.status(200).json(movie);
  }

  if (req.method === 'DELETE') {
    const { movieId } = req.query;

    if (typeof movieId !== 'string') {
      return res.status(400).json({ error: 'Invalid Id' });
    }

    if (!movieId) {
      return res.status(400).json({ error: 'Missing Id' });
    }

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      }
    });

    if (!existingMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      }
    });

    return res.status(200).json(updatedUser);
  }

  return res.status(405).end();
}
