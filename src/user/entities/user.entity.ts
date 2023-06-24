import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { compareSync, hashSync } from 'bcrypt';
  
  @Entity({ name: 'user' })
  export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ length: 50 })
    name: string;
  
    @Column({ length: 50 })
    lastname: string;
  
    @Column({ unique: true, length: 100 })
    email: string;
  
    // @Column({ length: 20 })
    // docType: string;
  
    // @Column({ unique: true, length: 20 })
    // docNum: string;
  
    @Column({ length: 100 })
    password: string;
  
    // @Column({ length: 20 })
    // cellPhoneNum: string;
  
    // @Column({ default: true })
    // isActivate: boolean;
  
    @Column({ default: 'client', length: 15 })
    role: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @BeforeInsert()
    hashPassword() {
      this.password = hashSync(this.password, 10);
    }
  
    matchPassword(password: string): boolean {
      return compareSync(password, this.password);
    }
  }
