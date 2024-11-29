<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240704074358 extends AbstractMigration
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
        $this->addSql('ALTER TABLE loop_step ALTER conditions TYPE JSONB');
        $this->addSql('COMMENT ON COLUMN loop_step.conditions IS \'(DC2Type:json_document)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE http_step ALTER treatment TYPE JSONB');
        $this->addSql('COMMENT ON COLUMN http_step.treatment IS NULL');
        $this->addSql('ALTER TABLE loop_step ALTER conditions TYPE JSONB');
        $this->addSql('COMMENT ON COLUMN loop_step.conditions IS NULL');
    }
}
