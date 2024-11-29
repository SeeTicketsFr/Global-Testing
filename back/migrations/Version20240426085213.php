<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240426085213 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE sleep_step (id UUID NOT NULL, duration INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN sleep_step.id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE sleep_step ADD CONSTRAINT FK_D6BA9D3BBF396750 FOREIGN KEY (id) REFERENCES abstract_step (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE step DROP CONSTRAINT fk_43b9fe3ce04e49df');
        $this->addSql('DROP TABLE step');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE step (id UUID NOT NULL, scenario_id UUID NOT NULL, name VARCHAR(255) NOT NULL, step_number INT NOT NULL, method VARCHAR(255) DEFAULT NULL, url VARCHAR(1000) DEFAULT NULL, content JSON DEFAULT NULL, type JSONB NOT NULL, variables JSONB DEFAULT NULL, headers JSONB DEFAULT NULL, check_conditions JSONB DEFAULT NULL, treatment JSONB DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_43b9fe3ce04e49df ON step (scenario_id)');
        $this->addSql('COMMENT ON COLUMN step.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN step.scenario_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE step ADD CONSTRAINT fk_43b9fe3ce04e49df FOREIGN KEY (scenario_id) REFERENCES scenario (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE sleep_step DROP CONSTRAINT FK_D6BA9D3BBF396750');
        $this->addSql('DROP TABLE sleep_step');
    }
}
