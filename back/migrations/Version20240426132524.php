<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240426132524 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE http_step ALTER method SET NOT NULL');
        $this->addSql('ALTER TABLE http_step ALTER url SET NOT NULL');
        $this->addSql('ALTER TABLE log ADD id_execution UUID NOT NULL');
        $this->addSql('ALTER TABLE log ADD human_description VARCHAR(1000) NOT NULL');
        $this->addSql('ALTER TABLE log DROP name');
        $this->addSql('COMMENT ON COLUMN log.id_execution IS \'(DC2Type:uuid)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE log ADD name VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE log DROP id_execution');
        $this->addSql('ALTER TABLE log DROP human_description');
        $this->addSql('ALTER TABLE http_step ALTER method DROP NOT NULL');
        $this->addSql('ALTER TABLE http_step ALTER url DROP NOT NULL');
    }
}
