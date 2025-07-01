import { Injectable } from '@nestjs/common';
import { Engine } from 'json-rules-engine';

export interface Fact {
  [key: string]: string | number | boolean | Array<any>;
}

@Injectable()
export class RuleEngineService {
  private engine: Engine;

  constructor() {
    this.engine = new Engine();
  }

  async execute(rules: any[], facts: any): Promise<{ events: any; success: boolean }> {
    try {
      rules.forEach((rule) => {
        this.engine.addRule(rule);
      });

      const result = await this.engine.run(facts);
      const events = result.events;
      const success = events.length > 0;
      return { events, success };
    } catch (error) {
      console.error('Rule engine execution error:', error);
      return { events: [], success: false };
    }
  }
}
