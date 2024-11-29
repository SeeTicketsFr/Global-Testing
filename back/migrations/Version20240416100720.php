<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240416100720 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE variable DROP CONSTRAINT fk_cc4d878d73b21e9c');
        $this->addSql('DROP TABLE variable');
        $this->addSql('ALTER TABLE step ADD variables JSONB DEFAULT NULL');
        $this->addSql('ALTER TABLE step ALTER type SET NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE variable (id UUID NOT NULL, step_id UUID NOT NULL, name VARCHAR(255) NOT NULL, value VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_cc4d878d73b21e9c ON variable (step_id)');
        $this->addSql('COMMENT ON COLUMN variable.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN variable.step_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE variable ADD CONSTRAINT fk_cc4d878d73b21e9c FOREIGN KEY (step_id) REFERENCES step (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE step DROP variables');
        $this->addSql('ALTER TABLE step ALTER type DROP NOT NULL');
    }
}
