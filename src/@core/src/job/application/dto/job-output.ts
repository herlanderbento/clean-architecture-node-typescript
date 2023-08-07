import { Job } from "../../domain/entities/job";

export type JobOutput = {
  id: string;
  name: string;
  description?: string;   
  is_active?: boolean;
  created_at: Date;
};

export class JobOutputMapper {
  public static toOutput(entity: Job) {
    return entity.toJSON();
  }
}
