import {Request, Response, Router} from "express";
import Note from "../models/note";
import {UserRole} from "../models/user";
import AuthenticationController from "./authentication";

export default class NoteController {
  constructor(app: Router) {
    const router = Router();
    router.post("/new", AuthenticationController.authMiddleware, this.newNote);
    router.get(
      "/all",
      AuthenticationController.authMiddleware,
      this.getAllNotes
    );
    router.get("/:id", AuthenticationController.authMiddleware, this.getNote);
    router.delete(
      "/:id",
      AuthenticationController.authMiddleware,
      this.deleteNote
    );

    app.use("/note", router);
  }

  private async newNote(req: Request, res: Response) {
    try {
      if (!req.body.note) {
        res.status(400).json({msg: "missing note"});
        return;
      }

      const note = new Note({
        note: req.body.note,
        // @ts-ignore
        userId: req.session.user.id,
      });
      await note.save();

      res.json(note.toJSON());
    } catch {
      res.status(500).json({error: "Something failed"});
    }
  }

  private async getAllNotes(req: Request, res: Response) {
    try {
      let filter = {}
      // @ts-ignore;
      if (req.session.user.role !== UserRole.ADMIN) {
        filter = {
          where: {
            // @ts-ignore
            userId: req.session.user.id,
          },
        };
      }

      const notes = await Note.findAll(filter);

      res.json(notes.map((note) => note.toJSON()));
    } catch {
      res.status(500).json({error: "Something failed"});
    }
  }

  private async getNote(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        res.status(400).json({msg: "missing id"});
        return;
      }

      const note = await Note.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!note) {
        res.status(404).json({msg: "note not found"});
        return;
      }

      // @ts-ignore
      if (note.userId !== req.session.user.id && req.session.user.role !== UserRole.ADMIN) {
        res.status(403).json({msg: "not your note"});
        return;
      }

      res.json(note.toJSON());
    } catch {
      res.status(500).json({error: "Something failed"});
    }
  }

  private async deleteNote(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        res.status(400).json({msg: "missing id"});
        return;
      }

      const note = await Note.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!note) {
        res.status(404).json({msg: "note not found"});
        return;
      }

      // @ts-ignore
      if (note.userId !== req.session.user.id && req.session.user.role !== UserRole.ADMIN) {
        res.status(403).json({msg: "not your note"});
        return;
      }

      await note.destroy();
      res.json({msg: "Deleted"});
    } catch {
      res.status(500).json({error: "Something failed"});
    }
  }
}
