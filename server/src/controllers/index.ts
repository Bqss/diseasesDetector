import { Request, Response } from "express";
import { prisma } from "..";

export class IndexController {
  static async getPenyakit(req: Request, res: Response) {
    try {
      const result = await prisma.penyakit.findMany();
      res.status(200).send(result);
    } catch (err) {
      res.sendStatus(500);
    }
  }
  static async getGejala(req: Request, res: Response) {
    const { id_penyakit } = req.query;
    try {
      if (id_penyakit) {
        const result = await prisma.gejala.findMany({
          where: {
            id: Number(id_penyakit),
          },
        });
        return res.send(result);
      }
      const result = await prisma.gejala.findMany();
      res.status(200).send(result);
    } catch (err) {
      res.sendStatus(500);
    }
  }

  static async addPenyakit(req: Request, res: Response) {
    const { nama_penyakit, definisi_penyakit } = req.body;
    try {
      await prisma.penyakit.create({
        data: {
          nama_penyakit,
          definisi: definisi_penyakit,
        },
      });

      res.sendStatus(201);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  static async addGejala(req: Request, res: Response) {
    const { gejala } = req.body;
    try {
      await prisma.gejala.create({
        data: {
          gejala,
        },
      });

      res.sendStatus(201);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  static async bindGejala(req: Request, res: Response) {
    const { id_penyakit, id_gejala } = req.params;

    try {
      await prisma.penyakit_gejala.create({
        data: {
          id_gejala: Number(id_gejala),
          id_penyakit: Number(id_penyakit),
        },
      });

      res.sendStatus(201);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  static async diagnosa(req: Request, res: Response) {
    const { gejala } = req.query;

    const gejalaPenyakit = gejala
      ?.toString()
      .split(",")
      .map((e) => e.trim());
    try {
      const result = await prisma.penyakit.findMany({
        where: {
          Penyakit_gejala: {
            some: {
              gejala: {
                gejala: {
                  in: gejalaPenyakit,
                },
              },
            },
          },
        },
      });

      const hasilDiagnosa = await Promise.all(
        [...result].map(async (e) => {
          const gejala = await prisma.gejala.findMany({
            where: {
              Penyakit_gejala: {
                some: {
                  id_penyakit: e.id,
                },
              },
            },
          });

          const percent =
            ([...gejala].filter((g) => gejalaPenyakit?.includes(g.gejala))
              .length /
              gejala.length) *
            100;
          return {
            id: e.id,
            nama_penyakit: e.nama_penyakit,
            definisi: e.definisi,
            persentase: percent,
          };
        })
      );

      res.send(hasilDiagnosa);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  static async getQs(req: Request, res: Response) {
    const { gejala } = req.query;
    try {
      const relevantDisease = await prisma.penyakit_gejala.findMany({
        where: {
          gejala: {
            gejala: {
              equals: gejala?.toString(),
            },
          },
        },
      });

      const antiD = [...new Set(relevantDisease.map((rs) => rs.id_penyakit))];

      const gr = await prisma.penyakit_gejala.findMany({
        where: {
          id_penyakit: {
            in: antiD,
          },
        },
      });

      const gejalaSerupa = await prisma.gejala.findMany({
        where: {
          id: {
            in: gr.map((g) => g.id_gejala),
          },
          NOT: {
            gejala: gejala?.toString(),
          },
        },
      });

      res.send(gejalaSerupa);
    } catch (error) {}
  }
}
