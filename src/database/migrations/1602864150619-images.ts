import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602864150619 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table ({
      name:'images',
      columns:[
        {
          name:'id',
          type:'integer',
          unsigned:true,
          isPrimary:true,
          isGenerated:true,
          generationStrategy:'increment',
        },
        {
          name:'path',
          type:'varchar'
        },
        {
          name:'store_id',
          type:'integer'
        }
      ],
      foreignKeys:[
        {
          name:'ImageStore',
          columnNames:['store_id'],
          referencedTableName:'stores',
          referencedColumnNames:['id'],
          onUpdate:'CASCADE',
          onDelete:'CASCADE'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }

}
