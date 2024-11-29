<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240426075538 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE loop_step (id UUID NOT NULL, conditions JSONB DEFAULT NULL, step_to_return INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN loop_step.id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE loop_step ADD CONSTRAINT FK_FBF79CFEBF396750 FOREIGN KEY (id) REFERENCES abstract_step (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE loop_step DROP CONSTRAINT FK_FBF79CFEBF396750');
        $this->addSql('DROP TABLE loop_step');
    }
}
