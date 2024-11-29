<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240425131739 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE abstract_step (id UUID NOT NULL, scenario_id UUID NOT NULL, name VARCHAR(255) NOT NULL, step_number INT NOT NULL, variables JSONB DEFAULT NULL, dtype VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_B05D8D3DE04E49DF ON abstract_step (scenario_id)');
        $this->addSql('COMMENT ON COLUMN abstract_step.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN abstract_step.scenario_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE http_step (id UUID NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN http_step.id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE abstract_step ADD CONSTRAINT FK_B05D8D3DE04E49DF FOREIGN KEY (scenario_id) REFERENCES scenario (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE http_step ADD CONSTRAINT FK_E21328BBBF396750 FOREIGN KEY (id) REFERENCES abstract_step (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE abstract_step DROP CONSTRAINT FK_B05D8D3DE04E49DF');
        $this->addSql('ALTER TABLE http_step DROP CONSTRAINT FK_E21328BBBF396750');
        $this->addSql('DROP TABLE abstract_step');
        $this->addSql('DROP TABLE http_step');
    }
}
