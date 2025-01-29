import { Injectable } from '@nestjs/common';
import { Rule } from '../../domain/entities/rule';
import { PrismaRuleMapper } from '../mappers/prisma-rule.mapper';
import { RuleRepository } from '../../application/interfaces/rule.repository.interface';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class PrismaRuleRepository implements RuleRepository {
  constructor(private prisma: PrismaService) {}

  async create(rule: Rule): Promise<void> {
    const raw = PrismaRuleMapper.toPrisma(rule);

    await this.prisma.rule.create({
      data: {
        tag: raw.tag,
        value: raw.value,
      },
    });
  }

  async findAll(): Promise<Rule[]> {
    const rules = await this.prisma.rule.findMany();

    return rules.map((rule) => PrismaRuleMapper.toDomain(rule));
  }

  async findManyByTags(ruleTags: string[]): Promise<Rule[]> {
    const rules = await this.prisma.rule.findMany({
      where: {
        tag: {
          in: ruleTags,
        },
      },
    });

    if (rules.length === 0) return [];

    return rules.map((rule) => PrismaRuleMapper.toDomain(rule));
  }
}
