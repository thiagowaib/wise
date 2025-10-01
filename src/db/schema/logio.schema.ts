import { pgTable, serial, text, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";

export const logio = pgTable("logio", {
  id: serial("id").primaryKey(),                        
  createdAt: timestamp("created_at").defaultNow().notNull(), 
  method: varchar("method", { length: 10 }).notNull(), 
  endpoint: text("endpoint").notNull(),                
  ip: varchar("ip", { length: 50 }).notNull(),         
  userAgent: text("user_agent"),                       
  requestData: jsonb("request_data"),                  
  responseData: jsonb("response_data"),                
  statusCode: varchar("status_code", { length: 3 })
});
