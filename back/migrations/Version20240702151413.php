<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240702151413 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE http_step ALTER treatment TYPE JSONB');
        $this->addSql('COMMENT ON COLUMN http_step.treatment IS \'(DC2Type:json_document)\'');
        $this->addSql('ALTER TABLE log ADD created_at TIMESTAMP(6) WITHOUT TIME ZONE');
        $this->addSql('COMMENT ON COLUMN log.created_at IS \'(DC2Type:datetime_immutable)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE http_step ALTER treatment TYPE JSONB');
        $this->addSql('COMMENT ON COLUMN http_step.treatment IS NULL');
        $this->addSql('ALTER TABLE log DROP created_at');
    }
}
