import {Field, ID, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, ObjectIdColumn} from "typeorm";

@ObjectType()
@Entity()
class User extends BaseEntity {
    @Field(type => ID)
    @ObjectIdColumn()
    id: string;

    @Field()
    @Column()
    email: string;

    @Column()
    password: string;

    @Column("int", {default: 0})
    tokenVersion: number
}

export default User;