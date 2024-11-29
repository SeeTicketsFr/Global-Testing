<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240408145644 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE scenario (id UUID NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN scenario.id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE step (id UUID NOT NULL, scenario_id UUID NOT NULL, name VARCHAR(255) NOT NULL, step_number INT NOT NULL, method VARCHAR(255) NOT NULL, expected_status_code INT NOT NULL, url VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_43B9FE3CE04E49DF ON step (scenario_id)');
        $this->addSql('COMMENT ON COLUMN step.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN step.scenario_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE step ADD CONSTRAINT FK_43B9FE3CE04E49DF FOREIGN KEY (scenario_id) REFERENCES scenario (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE step DROP CONSTRAINT FK_43B9FE3CE04E49DF');
        $this->addSql('DROP TABLE scenario');
        $this->addSql('DROP TABLE step');
    }
}
