import { Rule as RawRule } from '@prisma/client';
import { Rule } from '../../domain/entities/rule';

export class PrismaRuleMapper {
  static toPrisma(rule: Rule): RawRule {
    return {
      id: rule.id,
      tag: rule.tag,
      value: rule.value,
    };
  }

  static toDomain(raw: RawRule): Rule {
    return new Rule(
      {
        tag: raw.tag,
        value: raw.value,
      },
      raw.id,
    );
  }
}
