<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250212151143 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE webhook (id UUID NOT NULL, scenario_id UUID NOT NULL, event_type VARCHAR(255) NOT NULL, url VARCHAR(1000) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_8A741756E04E49DF ON webhook (scenario_id)');
        $this->addSql('COMMENT ON COLUMN webhook.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN webhook.scenario_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE webhook ADD CONSTRAINT FK_8A741756E04E49DF FOREIGN KEY (scenario_id) REFERENCES scenario (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE log ALTER created_at TYPE TIMESTAMP(6) WITHOUT TIME ZONE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE webhook DROP CONSTRAINT FK_8A741756E04E49DF');
        $this->addSql('DROP TABLE webhook');
        $this->addSql('ALTER TABLE log ALTER created_at TYPE TIMESTAMP(0) WITHOUT TIME ZONE');
    }
}
