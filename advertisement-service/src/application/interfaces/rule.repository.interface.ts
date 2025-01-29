import { Rule } from '../../domain/entities/rule';

export abstract class RuleRepository {
  abstract create(rule: Rule): Promise<void>;
  abstract findAll(): Promise<Rule[]>;
  abstract findManyByTags(ruleTags: string[]): Promise<Rule[]>;
}
