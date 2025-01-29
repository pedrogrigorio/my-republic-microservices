import { RuleResponseDto } from '../dtos/rule-response.dto';
import { Rule } from '../../domain/entities/rule';

export class RuleMapper {
  static toDto(rule: Rule): RuleResponseDto {
    return {
      id: rule.id,
      tag: rule.tag,
      value: rule.value,
    };
  }
}
