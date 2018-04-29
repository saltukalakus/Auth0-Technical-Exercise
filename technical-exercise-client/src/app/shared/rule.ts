export interface Rule {
  id: string;
  stage: string;
  name: string;
  enabled: boolean;
  script: string;
  order: string;
}
