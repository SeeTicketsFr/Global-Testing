<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240705100546 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE log ADD scenario_id UUID NOT NULL');
        $this->addSql('COMMENT ON COLUMN log.scenario_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN log.created_at IS NULL');
        $this->addSql('ALTER TABLE log ADD CONSTRAINT FK_8F3F68C5E04E49DF FOREIGN KEY (scenario_id) REFERENCES scenario (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_8F3F68C5E04E49DF ON log (scenario_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE log DROP CONSTRAINT FK_8F3F68C5E04E49DF');
        $this->addSql('DROP INDEX IDX_8F3F68C5E04E49DF');
        $this->addSql('ALTER TABLE log DROP scenario_id');
        $this->addSql('COMMENT ON COLUMN log.created_at IS \'(DC2Type:datetime_immutable)\'');
    }
}
