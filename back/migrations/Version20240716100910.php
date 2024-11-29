<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240716100910 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE log ADD id_step UUID NOT NULL');
        $this->addSql('ALTER TABLE log ADD step JSONB DEFAULT NULL');
        $this->addSql('COMMENT ON COLUMN log.id_step IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN log.step IS \'(DC2Type:json_document)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE log DROP id_step');
        $this->addSql('ALTER TABLE log DROP step');
    }
}
