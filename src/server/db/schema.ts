// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  timestamp,
  time,
  varchar,
  boolean,
  integer,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'


/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `caredFor_${name}`);

export const users = createTable('users', {
  id: serial('id').primaryKey(),
  customerId: varchar('customer_id', { length: 256 }).notNull(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
  email: varchar('email', { length: 256 }).notNull(),
  checkedIn: boolean('checked_in').default(false),
  scheduleId: varchar('schedule_id', { length: 256 }),
  checkInTime: time('check_in_time', { withTimezone: false }),
  attemptCount: integer('attempt_count').default(0),
  onFreeTrial: boolean('on_free_trial').default(true),
  freeTrialStart: timestamp('free_trial_start', { withTimezone: false }).defaultNow(),
  completedUserOnboarding: boolean('completed_user_onboarding').default(false),
}, (users) => ({
  emailIndex: uniqueIndex('email_idx').on(users.email)
}))

export const usersRelations = relations(users, ({ many }) => ({
  dependents: many(dependents),
}));

export type SelectUser = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

export const dependents = createTable('dependents', {
  id: serial('id').primaryKey().notNull(),
  fullName: text('full_name').notNull(),
  phone: varchar('phone', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }),
  userId: integer('user_id').references(() => users.id),
});

export const dependentRelations = relations(dependents, ({ one }) => ({
  users: one(users, {
    fields: [dependents.userId],
    references: [users.id],
  })
}));

export type SelectDependents = InferSelectModel<typeof dependents>;
export type InsertDependents = InferInsertModel<typeof dependents>;
